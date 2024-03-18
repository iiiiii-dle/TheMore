document.addEventListener('DOMContentLoaded', () => {
    const quote1 = '"한 푼 아낀 것은 한 푼 <br> 번 것이나 마찬가지다." <br> <br> - 벤자민 프랭클린';
    const quote2 = '"버는 것보다 적게 쓰는 것을 안다면 <br> 현자의 돌을 가진 것과 같다." <br> <br> - 벤자민 프랭클린';
    const quote3 = '"절약하지 않는 자는 <br> 고뇌하게 될 것이다." <br> <br> - 공자';
    const quote4 = '"돈 생각을 떨쳐내는 유일한 <br> 방법은 돈을 많이 갖는 것이다." <br> <br> - 이디스 워튼';
    const quote5 = '"가난에 대한 두려움이 삶을 <br> 지배하도록 내버려두면, <br> 그 대가로 당신은 먹기는 할 것이나 <br> 살지는 못할 것이다." <br> <br> - 조지 버나드 쇼';
    const quote6 = '"돈에 대해 쉽게 사는 방법은 <br> 생활수준을 형편보다 <br> 한 단계 낮추는 것이다." <br> <br> - 헨리 테일러 경';
    const quote7 = '"돈이 전부는 아니지만, <br> 그만한 게 없다." <br> <br> - 메이웨더';
    const quote8 = '"돈지갑의 밑바닥이 드러났을 때의 <br> 절약은 이미 늦은 행위다." <br> <br> - 세네카';
    const quote9 = '"검약은 멋진 수입이다." <br> <br> - 에라스무스';
    const quote10 = '"근면은 부유의 오른손이요, 절약은 그 왼손이다." <br> <br> - J.레이';
    const quotes = [
        quote1, quote2, quote3, quote4, quote5,
        quote6, quote7, quote8, quote9, quote10
    ];

    function updateQuote() {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('quote').innerHTML = randomQuote;
    }

    updateQuote();
});