$(document).ready(function () {
  // ... (tu código para cargar estilos y scripts aquí)

  Promise.all([
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js",
      "sha512-bPs7Ae6pVvhOSiIcyUClR7/q2OAsRiovw4vAkX+zJbw3ShAeeqezq50RIIcIURq7Oa20rW2n2q+fyXBNcU9lrw==",
      "anonymous"
    )
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

          response.forEach(function (course) {
            console.log("course: " + course.fullname);
            owl.append('<div class="item"><h4>' + course.fullname + "</h4></div>");
          });

          // Inicializa Owl Carousel solo una vez, después de agregar todos los elementos
          owl.owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            items: 3 // Número de elementos visibles
          });
        },
        error: function (error) {
          console.log("Error al obtener información de los cursos:", error);
        }
      });
    })
    .catch(function () {
      console.log("Algo salió mal al cargar los scripts");
    });
});
