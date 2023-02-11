export default function sum(...args) {
    return args.reduce(function (p, c) {
        return p + c;
    });
}