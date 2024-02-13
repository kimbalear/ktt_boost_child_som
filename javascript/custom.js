require(["jquery"], function ($) {
  $(document).ready(function () {
    var userToken = "786b2d70191e8e690e6c3b4ac7045a45";

    // URL para la API REST de Moodle
    var moodleUrl = M.cfg.wwwroot + "/webservice/rest/server.php";

    // Parámetros para la llamada a la API
    var data = {
      wstoken: userToken,
      wsfunction: "core_course_get_courses",
      moodlewsrestformat: "json",
    };

    function loadStylesheet(href, integrity, crossorigin) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.integrity = integrity;
      link.crossOrigin = crossorigin;
      document.head.appendChild(link);
    }

    loadStylesheet(
      "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css",
      "sha512-tS3S5qG0BlhnQROyJXvNjeEM4UpMXHrQfTGmbQ1gKmelCxlSEBUaxhRBj/EFTzpbP4RVSrpEikbmdJobCvhE3g==",
      "anonymous"
    );

    loadStylesheet(
      "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css",
      "sha512-sMXtMNL1zRzolHYKEujM2AqCLUR9F2C4/05cdbxjjLSRvMQIciEPCQZo++nk7go3BtSuK9kfa/s+a4f4i5pLkw==",
      "anonymous"
    );

    function loadScript(src, integrity, crossorigin) {
      return new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        script.integrity = integrity;
        script.crossOrigin = crossorigin;
        script.onload = resolve; // Resuelve la promesa cuando el script se haya cargado
        script.onerror = reject; // Rechaza la promesa si hay un error
        document.head.appendChild(script);
      });
    }

    Promise.all([
      loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js",
        "sha512-bPs7Ae6pVvhOSiIcyUClR7/q2OAsRiovw4vAkX+zJbw3ShAeeqezq50RIIcIURq7Oa20rW2n2q+fyXBNcU9lrw==",
        "anonymous"
      ),
    ])
      .then(function () {
        console.log("Todos los scripts han sido cargados");
        // Realizar la llamada AJAX a la API de Moodle
        $.ajax({
          type: "GET",
          url: moodleUrl,
          data: data,
          success: function (response) {
            var owl = $("#owl-carousel-courses");
            owl.empty(); // Vacía el contenedor antes de agregar nuevos elementos

            // Descarta el primer elemento del array
            var courses = response.slice(1);

            courses.forEach(function (course) {
              // Extraer la URL de la imagen del resumen del curso
              var imgSrcMatch = course.summary.match(/<img.*?src="(.*?)"/);
              var imgSrc = imgSrcMatch
                ? imgSrcMatch[1].replace("/webservice", "")
                : "path/to/default/image.jpg";
              // imagen predeterminada si no hay imagen del resumen del curso
              // Limpiar course.summary
              course.summary = course.summary
                .replace(/<hr\s*\/?>/g, "")
                .replace(
                  /<p><span><img class="[^"]+" src="[^"]+" alt="[^"]+" width="[^"]+" height="[^"]+" \/><\/span><\/p>/g,
                  ""
                );
              var courseUrl =
                "/course/view.php?id=" + course.id;

              // Logs para depuración
              console.log("ID :" + course.id)
              console.log("courseUrl: " + courseUrl)
              console.log("-- Course:", course);
              // ... (otros logs)

              // Agregar al carrusel
              owl.append(
                '<div class="item">' +
                  '<div class="item__card_course">' +
                  '<div class="img_course"><img src="' +
                  imgSrc +
                  '" alt="' +
                  course.fullname +
                  '"></div>' +
                  '<div class="content_course">' +
                  '<div class="name_course">' +
                  course.fullname +
                  "</div>" +
                  course.summary +
                  "</div>" +
                  '<div class="cta_course"><a href="' +
                  courseUrl +
                  '" target="_blank" class="course-btn">Go to the course</a></div>' +
                  "</div></div>"
              );
            });

            // Inicializa Owl Carousel solo una vez, después de agregar todos los elementos
            owl.owlCarousel({
              loop: true,
              margin: 20,
              autoplay: false,
              autoplayTimeout: 2500,
              stagePadding: 8,
              nav: false,
              dots: true,
              responsive: {
                0: {
                  items: 1,
                },
                600: {
                  items: 2,
                },
                960: {
                  items: 3,
                },
                1200: {
                  items: 3,
                },
              },
            });
          },
          error: function (error) {
            console.log("Error al obtener información de los cursos:", error);
          },
        });
      })
      .catch(function () {
        console.log("Algo salió mal al cargar los scripts");
      });

    //$("#login").remove();

    $("#page-header").remove();

    $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
        $("#scroll").fadeIn();
      } else {
        $("#scroll").fadeOut();
      }
    });
    $("#scroll").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
      return false;
    });

    // Slider configuration

    var $slides = document.querySelectorAll(".myslide");
    var $controls = document.querySelectorAll(".slider__control");
    var numOfSlides = $slides.length;
    var slidingAT = 1300; // sync this with scss variable
    var slidingBlocked = false;

    [].slice.call($slides).forEach(function ($el, index) {
      var i = index + 1;
      $el.classList.add("slide-" + i);
      $el.dataset.slide = i;
    });

    [].slice.call($controls).forEach(function ($el) {
      $el.addEventListener("click", controlClickHandler);
    });

    function controlClickHandler() {
      if (slidingBlocked) return;
      slidingBlocked = true;

      var $control = this;
      var isRight = $control.classList.contains("m--right");
      var $curActive = document.querySelector(".myslide.s--active");
      var index = +$curActive.dataset.slide;
      isRight ? index++ : index--;
      if (index < 1) index = numOfSlides;
      if (index > numOfSlides) index = 1;
      var $newActive = document.querySelector(".slide-" + index);

      $control.classList.add("a--rotation");
      $curActive.classList.remove("s--active", "s--active-prev");
      document.querySelector(".myslide.s--prev").classList.remove("s--prev");

      $newActive.classList.add("s--active");
      if (!isRight) $newActive.classList.add("s--active-prev");

      var prevIndex = index - 1;
      if (prevIndex < 1) prevIndex = numOfSlides;

      document.querySelector(".slide-" + prevIndex).classList.add("s--prev");

      setTimeout(function () {
        $control.classList.remove("a--rotation");
        slidingBlocked = false;
      }, slidingAT * 0.75);
    }

    // fin slider
  });

  function showRandomImage(className) {
    var images = $("." + className);

    // Comprobar el ancho de la ventana
    if (window.innerWidth <= 713) {
      // Si el ancho de la ventana es menor o igual a 711px
      images.hide();
      var randomIndex = Math.floor(Math.random() * images.length);
      images.eq(randomIndex).show();
    } else {
      images.hide();
    }
  }

  // Definir el intervalo (por ejemplo, 3 segundos)
  var intervalo = 3000; // 3000 milisegundos = 3 segundos

  // Iniciar el intervalo
  setInterval(function () {
    showRandomImage("sl1");
    showRandomImage("sl2");
    showRandomImage("sl3");
    showRandomImage("sl5");
  }, intervalo);
});
