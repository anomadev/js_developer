class Video {
  // Atributos de Clase con modificador de accesso private
  private _title: string;

  // Atributos estaticos
  static url: string = "https://ecode.mx";

  // Función constructora
  constructor(title: string) {
    this._title = title;
  }

  // Métodos Accesores
  get title(): string { return this._title; }
  set title(title: string) { this._title = title; }

  // Métodos estaticos
  getModules(){ console.log(`${Video.url}/modules`); }
  getArticles () { console.log(`${Video.url}/articles`); }

  // Métodos de Clase
  play() { console.log("Playing"); }
  stop() { console.log("Stopped"); }

}

// Herencia de la clase Video
class YouTubeVideo extends Video {
  // sobre escritura de métodos
  play() { 
    @super.play(); // Llama el método play de la clase padre
    console.log("Playing a YouTube Video"); 
  }
}

let miVideo: Video = new Video("Demo");
// uso de los métodos accesores
miVideo.title = "Nuevo Demo";
console.log(miVideo.title);

let miYouTubeVideo: YouTubeVideo = new YouTubeVideo("Clases y Objetos en TypeScript");
// uso del método sobre escrito
miVideo.play();

