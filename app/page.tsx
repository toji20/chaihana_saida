"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  MapPin,
  Menu as MenuIcon,
  X,
} from "lucide-react";

type Dish = {
  name: string;
  price: number;
  weight: string;
  description?: string;
  image?: string;
  tag?: string;
};
type Category = { name: string; intro: string; dishes: Dish[] };

const categories: Category[] = [
  {
    name: "Горячие блюда",
    intro: "Сытные блюда, приготовленные с душой.",
    dishes: [
      {
        name: "Жаркое из говядины с картошкой",
        price: 420,
        weight: "450 г",
        description:
          "Сочная говядина, ароматная картошка, красный лук, специи и свежая зелень.",
        image: "photo-1544025162-d76694265947",
        tag: "Хит",
      },
      {
        name: "Жаркое из индейки",
        price: 340,
        weight: "450 г",
        description:
          "Филе индейки с луком, болгарским перцем, томатами и зеленью.",
      },
      {
        name: "Жаркое из курицы",
        price: 320,
        weight: "450 г",
        description:
          "Куриная голень с картофелем, луком и ароматными специями.",
      },
      {
        name: "Котлеты с гарниром",
        price: 360,
        weight: "450 г",
        description: "Сочные говяжьи котлеты, гарнир и свежие овощи.",
      },
      {
        name: "Лагман",
        price: 340,
        weight: "450 г",
        description: "Домашняя лапша, говядина и овощи в ароматном бульоне.",
        image: "photo-1569718212165-3a8278d5f624",
        tag: "Популярное",
      },
      {
        name: "Лагман жареный",
        price: 400,
        weight: "450 г",
        description: "Говядина, болгарский перец, томаты и насыщенный соус.",
      },
      {
        name: "Манты",
        price: 360,
        weight: "350 г · 6 шт.",
        description:
          "Тонкое тесто, говядина с луком. Подаются со сметаной или соусом.",
        image: "photo-156324 v2".replace(" v2", ""),
      },
      {
        name: "Плов с говядиной",
        price: 360,
        weight: "450 г",
        description:
          "Рассыпчатый рис, говядина, морковь, изюм и восточные специи.",
        image: "photo-1516684732162-798a0062be99",
        tag: "Фирменное",
      },
    ],
  },
  {
    name: "Шашлык",
    intro: "Жар с углей, аромат специй и сочное мясо.",
    dishes: [
      {
        name: "Куриные крылышки",
        price: 330,
        weight: "220 г",
        description: "Крылышки на гриле с лавашом, овощами и красным соусом.",
        image: "photo-1527477396000-e27163b481c2",
      },
      {
        name: "Куриный шашлык на углях",
        price: 300,
        weight: "220 г",
        description:
          "Куриное филе с золотистой корочкой, овощами, соусом и лавашом.",
      },
      {
        name: "Люля-кебаб из говядины",
        price: 400,
        weight: "220 г",
        description:
          "Мясо на огне с овощами и красным соусом в нежной лепёшке.",
        image: "photo-1555939594-58d7cb561ad1",
        tag: "Хит",
      },
      {
        name: "Шашлык из баранины на углях",
        price: 480,
        weight: "220 г",
        description: "Нежная баранина с овощами, соусом и свежим лавашом.",
        image: "photo-1544025162-d76694265947",
      },
      {
        name: "Шашлык из говядины на углях",
        price: 616,
        weight: "220 г",
        description:
          "Говядина с жаром углей, свежими овощами, соусом и лавашом.",
      },
    ],
  },
  {
    name: "Супы",
    intro: "Горячие, наваристые и по-домашнему уютные.",
    dishes: [
      {
        name: "Борщ",
        price: 300,
        weight: "500 г",
        description:
          "Овощной суп на мясном бульоне с нежной говядиной и свёклой.",
        image: "photo-1547592180-85f173990554",
      },
      {
        name: "Куза шурпа из баранины",
        price: 340,
        weight: "500 г",
        description: "Баранина, картофель, морковь, перец, томаты и нут.",
      },
      {
        name: "Мастава",
        price: 300,
        weight: "500 г",
        description: "Узбекский суп с говядиной, рисом, овощами и зеленью.",
      },
      {
        name: "Шурпа из говядины",
        price: 300,
        weight: "500 г",
        description: "Говядина, курдюк, картофель, овощи и нут.",
      },
    ],
  },
  {
    name: "Салаты",
    intro: "Свежие овощи и яркие сочетания.",
    dishes: [
      {
        name: "Греческий салат",
        price: 250,
        weight: "250 г",
        description: "Свежие овощи, маслины и нежный сыр фета.",
        image: "photo-1547592180-85f173990554",
      },
      {
        name: "Овощной салат",
        price: 110,
        weight: "150 г",
        description: "Огурцы, сочные помидоры, лук и свежая зелень.",
      },
      {
        name: "Салат Цезарь",
        price: 250,
        weight: "250 г",
        description:
          "Копчёная куриная грудка, черри, айсберг, гренки и пармезан.",
      },
    ],
  },
  {
    name: "Выпечка",
    intro: "Свежая выпечка и десерты к чаю.",
    dishes: [
      {
        name: "Лепёшка",
        price: 60,
        weight: "100 г",
        description: "Традиционная лепёшка из муки, соли и воды.",
        image: "photo-1586444248902-2f64eddc13df",
      },
      {
        name: "Самса",
        price: 100,
        weight: "100 г",
        description: "Сочная самса с говядиной в хрустящем тесте.",
      },
      {
        name: "Торт Рафаэлло",
        price: 200,
        weight: "150 г",
        description: "Воздушное безе, белый шоколад, заварной крем и кокос.",
      },
      {
        name: "Торт Сникерс",
        price: 200,
        weight: "150 г",
        description: "Нежный бисквитный десерт с кремом и хрустящим арахисом.",
      },
    ],
  },
  {
    name: "Напитки",
    intro: "Освежающие напитки и домашний компот.",
    dishes: [
      { name: "Coca-Cola 2 л", price: 200, weight: "2 л" },
      { name: "Coca-Cola 1 л", price: 140, weight: "1 л" },
      { name: "Coca-Cola 500 мл", price: 90, weight: "500 мл" },
      { name: "Coca-Cola 330 мл", price: 97, weight: "330 мл" },
      { name: "Fanta", price: 97, weight: "330 мл" },
      { name: "RC Cola", price: 200, weight: "1,5 л" },
      { name: "RC Cola", price: 150, weight: "1 л" },
      { name: "RC Cola", price: 90, weight: "500 мл" },
      { name: "Вода «Святой источник» без газа", price: 137, weight: "1 л" },
      { name: "Вода «Святой источник» без газа", price: 69, weight: "500 мл" },
      {
        name: "Компот фруктовый",
        price: 200,
        weight: "1 л",
        description:
          "Натуральный компот собственного изготовления из сухофруктов.",
        tag: "Домашний",
      },
      { name: "Натахтари Груша", price: 140, weight: "500 мл" },
      { name: "Натахтари Тархун", price: 140, weight: "500 мл" },
      { name: "Натахтари Фейхоа", price: 140, weight: "500 мл" },
    ],
  },
];

const photo = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const money = (price: number) => `${price.toLocaleString("ru-RU")} ₽`;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(categories[0].name);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const selected =
    categories.find((category) => category.name === activeCategory) ??
    categories[0];
  const filteredDishes = useMemo(
    () =>
      selected.dishes.filter((dish) =>
        `${dish.name} ${dish.description ?? ""}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [selected, search],
  );

  const goToMenu = () =>
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <header className="header">
        <a className="brand" href="#top" aria-label="Чайхана — главная">
          <span className="brand-mark">Ч</span>
          <span>
            ЧАЙХАНА<small>ВОСТОЧНАЯ КУХНЯ</small>
          </span>
        </a>
        <nav className={mobileOpen ? "nav nav-open" : "nav"}>
          <a href="#story" onClick={() => setMobileOpen(false)}>
            О нас
          </a>
          <a href="#menu" onClick={() => setMobileOpen(false)}>
            Меню
          </a>
          <a href="#atmosphere" onClick={() => setMobileOpen(false)}>
            Атмосфера
          </a>
          <a href="#contacts" onClick={() => setMobileOpen(false)}>
            Контакты
          </a>
        </nav>
        <a className="header-cta" href="#menu">
          Выбрать блюдо <ArrowUpRight size={16} />
        </a>
        <button
          className="mobile-toggle"
          aria-label="Открыть меню"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <MenuIcon />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-photo" />
        <div className="hero-grain" />
        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-line" /> МЕСТО, ГДЕ СОБИРАЮТСЯ СВОИ
          </div>
          <h1>
            Вкус Востока.
            <br />
            <em>Тепло дома.</em>
          </h1>
          <p className="hero-copy">
            Ароматный плов, мясо с огня и блюда, которыми хочется делиться.
            Заходите на обед, оставайтесь ради атмосферы.
          </p>
          <div className="hero-actions">
            <button className="button button-light" onClick={goToMenu}>
              Смотреть меню <ArrowDownRight size={18} />
            </button>
            <a
              className="text-link"
              href="https://yandex.ru/maps/-/CXb8JK79"
              target="_blank"
              rel="noreferrer"
            >
              Как нас найти <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="hero-note">
            <span className="note-star">✳</span>
            <span>
              ГОТОВИМ С ДУШОЙ
              <br />
              ПОДАЁМ ОТ СЕРДЦА
            </span>
          </div>
        </div>
        <div className="hero-caption">
          <span>ТРАДИЦИИ · ВКУС · ГОСТЕПРИИМСТВО</span>
          <span>01 / 03</span>
        </div>
        <a className="scroll-cue" href="#story">
          <span /> ЛИСТАЙТЕ ВНИЗ
        </a>
      </section>

      <section className="intro section-pad" id="story">
        <div className="section-kicker">01 — НАША ФИЛОСОФИЯ</div>
        <div className="intro-grid">
          <h2>
            Еда — это
            <br />
            <em>больше, чем еда.</em>
          </h2>
          <div className="intro-text">
            <p>
              Это долгие разговоры за большим столом, горячая лепёшка, которую
              делят на всех, и аромат специй, знакомый с детства.
            </p>
            <p>
              Мы собрали в меню любимые блюда восточной кухни — простые, сытные
              и приготовленные так, чтобы вам хотелось вернуться.
            </p>
            <a className="underlined-link" href="#menu">
              Открыть меню <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div className="values-row">
          <div>
            <span>01</span>
            <strong>Щедрые порции</strong>
            <small>Чтобы хватило на радость</small>
          </div>
          <div>
            <span>02</span>
            <strong>Знакомые вкусы</strong>
            <small>Традиции в каждой детали</small>
          </div>
          <div>
            <span>03</span>
            <strong>Гостеприимство</strong>
            <small>Встречаем как своих</small>
          </div>
        </div>
      </section>

      <section className="menu-section section-pad" id="menu">
        <div className="menu-heading">
          <div>
            <div className="section-kicker">02 — ЧТО СЕГОДНЯ НА СТОЛЕ</div>
            <h2>
              Наше <em>меню.</em>
            </h2>
          </div>
          <p>
            Выбирайте любимое.
            <br />
            Остальное мы приготовим.
          </p>
        </div>
        <div className="menu-toolbar">
          <div className="category-list">
            {categories.map((category, index) => (
              <button
                key={category.name}
                className={
                  activeCategory === category.name
                    ? "category-pill active"
                    : "category-pill"
                }
                onClick={() => {
                  setActiveCategory(category.name);
                  setSearch("");
                }}
              >
                <span>0{index + 1}</span>
                {category.name}
              </button>
            ))}
          </div>
          <label className="search-box">
            <span>⌕</span>
            <input
              aria-label="Поиск по меню"
              placeholder="Найти блюдо"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Очистить поиск">
                <X size={14} />
              </button>
            )}
          </label>
        </div>
        <div className="category-intro">
          <h3>
            {selected.name}
            <span> ({filteredDishes.length})</span>
          </h3>
          <p>{selected.intro}</p>
        </div>
        <div className="dish-grid">
          {filteredDishes.map((dish, index) => (
            <article
              className={`dish-card ${dish.image ? "has-image" : "no-image"}`}
              key={`${dish.name}-${dish.weight}-${index}`}
            >
              {dish.image ? (
                <div
                  className="dish-image"
                  style={{ backgroundImage: `url(${photo(dish.image, 700)})` }}
                >
                  {dish.tag && <span className="dish-tag">{dish.tag}</span>}
                  <span className="dish-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ) : (
                <div className="dish-no-image">
                  <span className="dish-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="dish-deco">✳</span>
                  {dish.tag && <span className="dish-tag">{dish.tag}</span>}
                </div>
              )}
              <div className="dish-info">
                <div className="dish-title-row">
                  <h4>{dish.name}</h4>
                  <strong>{money(dish.price)}</strong>
                </div>
                <div className="dish-meta">
                  <span>{dish.weight}</span>
                  {dish.description && (
                    <span className="dish-description">{dish.description}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        {filteredDishes.length === 0 && (
          <div className="empty-state">
            Ничего не нашлось. Попробуйте другое название.
          </div>
        )}
        <div className="menu-footnote">
          * Цены указаны в рублях. Актуальность меню и наличие блюд уточняйте у
          заведения.
        </div>
      </section>

      <section className="feature" id="atmosphere">
        <div className="feature-image" />
        <div className="feature-copy">
          <div className="section-kicker">03 — С ОГНЯ И С ЛЮБОВЬЮ</div>
          <h2>
            Тот самый
            <br />
            <em>вкус углей.</em>
          </h2>
          <p>
            Когда мясо шипит на мангале, специи раскрываются, а к столу уже
            несут свежую лепёшку — начинается настоящее застолье.
          </p>
          <a
            className="button button-light"
            href="#menu"
            onClick={() => setActiveCategory("Шашлык")}
          >
            К шашлыку <ArrowRight size={17} />
          </a>
        </div>
        <div className="feature-number">
          02<span> / 03</span>
        </div>
      </section>

      <section className="favorites section-pad">
        <div className="favorites-top">
          <div>
            <div className="section-kicker">04 — С ЧЕГО НАЧАТЬ</div>
            <h2>
              Любимая <em>классика.</em>
            </h2>
          </div>
          <a className="underlined-link" href="#menu">
            Всё меню <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="favorite-grid">
          <button
            className="favorite-card favorite-plov"
            onClick={() => {
              setActiveCategory("Горячие блюда");
              goToMenu();
            }}
          >
            <div className="favorite-img" />
            <span className="favorite-label">01 / ФИРМЕННОЕ</span>
            <div className="favorite-bottom">
              <span>Плов с говядиной</span>
              <strong>360 ₽</strong>
            </div>
          </button>
          <button
            className="favorite-card favorite-kebab"
            onClick={() => {
              setActiveCategory("Шашлык");
              goToMenu();
            }}
          >
            <div className="favorite-img" />
            <span className="favorite-label">02 / С МАНГАЛА</span>
            <div className="favorite-bottom">
              <span>Люля-кебаб</span>
              <strong>400 ₽</strong>
            </div>
          </button>
          <button
            className="favorite-card favorite-lagman"
            onClick={() => {
              setActiveCategory("Горячие блюда");
              goToMenu();
            }}
          >
            <div className="favorite-img" />
            <span className="favorite-label">03 / ДОМАШНЕЕ</span>
            <div className="favorite-bottom">
              <span>Лагман</span>
              <strong>340 ₽</strong>
            </div>
          </button>
        </div>
      </section>

      <section className="visit section-pad" id="contacts">
        <div className="visit-copy">
          <div className="section-kicker">05 — ПРИХОДИТЕ В ГОСТИ</div>
          <h2>
            Ваш стол
            <br />
            <em>уже ждёт.</em>
          </h2>
          <p>
            Загляните на обед, соберите друзей на ужин или просто возьмите
            горячую лепёшку с собой.
          </p>
          <a
            className="button button-dark"
            href="https://yandex.ru/maps/-/CXb8JK79"
            target="_blank"
            rel="noreferrer"
          >
            Построить маршрут <ArrowUpRight size={17} />
          </a>
          <div className="visit-details">
            <div>
              <MapPin size={18} />
              <span>
                <b>Мы на карте</b>
                <small>Откройте адрес в Яндекс Картах</small>
              </span>
            </div>
            <div>
              <Clock3 size={18} />
              <span>
                <b>Ждём вас</b>
                <small>График работы уточняйте по телефону</small>
              </span>
            </div>
          </div>
        </div>
        <a
          className="map-card"
          href="https://yandex.ru/maps/-/CXb8JK79"
          target="_blank"
          rel="noreferrer"
        >
          <div className="map-art">
            <div className="map-lines" />
            <div className="map-pin">
              <MapPin size={24} />
            </div>
            <span className="map-label">ЧАЙХАНА</span>
            <span className="map-stamp">
              ВСТРЕТИМСЯ
              <br />
              ЗА СТОЛОМ
            </span>
          </div>
          <div className="map-bottom">
            <span>Открыть в Яндекс Картах</span>
            <ArrowUpRight size={18} />
          </div>
        </a>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">Ч</span>
          <span>
            ЧАЙХАНА<small>ВОСТОЧНАЯ КУХНЯ</small>
          </span>
        </a>
        <p>
          Собираем за одним столом.
          <br />
          Остальное — детали.
        </p>
        <div className="footer-links">
          <a href="#story">О нас</a>
          <a href="#menu">Меню</a>
          <a href="#contacts">Контакты</a>
          <a
            href="https://yandex.ru/maps/-/CXb8JK79"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс Карты ↗
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Чайхана</span>
          <span>СДЕЛАНО С ТЕПЛОМ ✳</span>
        </div>
      </footer>
    </main>
  );
}
