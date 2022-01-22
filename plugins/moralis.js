import Moralis from 'moralis';

export default ({ $config: { moralis_key, moralis_url } }, inject) => {
    Moralis.initialize('BqiZ6r1dxGSFKnUCCgBc4lx6ZFiFWMgAHX4o1UKe');
    Moralis.serverURL = 'https://wl2ojp7adnkj.usemoralis.com:2053/server'

    // console.log(moralis_key)

    inject('moralis', Moralis)

}