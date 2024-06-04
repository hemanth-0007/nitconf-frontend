import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

const HomeCarousel = () => {
  return (
    <Carousel
      fade
      style={{ maxWidth: "1200px", maxHeight: "900px", margin: "auto" }}
    >
      <Carousel.Item>
        <img
          src="https://img.freepik.com/free-photo/large-group-people-sitting-auditorium-watching-presentation-generated-by-ai_188544-55828.jpg?t=st=1706449579~exp=1706453179~hmac=b1e02cdfa9fbffc80927f922f067262dfc40bd41e34fdd40b4ce8464216c3805&w=1380"
          alt=""
          className="home-carousel-img"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://img.freepik.com/free-photo/person-holding-speech-official-event_23-2151054185.jpg?t=st=1706455280~exp=1706458880~hmac=75c30d6bc38b1996c4c86b1dfeae4110b7dbd63ea833d34ebd94df4cf30b1a89&w=1060"
          alt=""
          className="home-carousel-img"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://img.freepik.com/free-photo/rear-view-female-business-executive-giving-speech_107420-63811.jpg?w=1060&t=st=1706455324~exp=1706455924~hmac=0bf3e26ad4f36342a125c8724a6c4e8b8ac9a3dcb0423303d8d14d208b4ed1f2"
          alt=""
          className="home-carousel-img"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
