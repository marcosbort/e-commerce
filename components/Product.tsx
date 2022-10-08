// import './Product.module.scss'

export default function Product() {
  return (
    <>
      <div className="plan-card">
        <h2>
          Dog Chow<span>Cachorros 21kg</span>
        </h2>

        <div className="etiquet-price">
          <p>8.500</p>
          <div></div>
        </div>
        
        <div className="button-get-plan">
          <a href="#">
            <span>START PROJECT</span>
          </a>
        </div>
        {/* <img className="card-image" src="" alt="foto" /> */}
        <img className="card-image" src="https://marcosbort.github.io/server/images/pet-food/tiernitos-adultos.jpg" alt="foto" />
      </div>
    </>
  )
}
