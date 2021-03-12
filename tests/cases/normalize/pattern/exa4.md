# Preval test case

# exa4.md

> Normalize > Pattern > Exa4
>
> from gist

#TODO

## Input

`````js filename=intro
let obj = {
  get a(){ return $('a') },
  get b() {
    return {
      get c() { return $('b') },
      get d() { return $('c') },
      get e() { return $('d') },
    };
  },
  get c(){ return $('c') },
};
let { a, b: { ...rest }, c } = obj;
$(a, c, rest);
`````

## Normalized

`````js filename=intro
let obj = {
  get a() {
    const tmpReturnArg = $('a');
    return tmpReturnArg;
  },
  get b() {
    const tmpReturnArg$1 = {
      get c() {
        const tmpReturnArg$2 = $('b');
        return tmpReturnArg$2;
      },
      get d() {
        const tmpReturnArg$3 = $('c');
        return tmpReturnArg$3;
      },
      get e() {
        const tmpReturnArg$4 = $('d');
        return tmpReturnArg$4;
      },
    };
    return tmpReturnArg$1;
  },
  get c() {
    const tmpReturnArg$5 = $('c');
    return tmpReturnArg$5;
  },
};
let bindingPatternObjRoot = obj;
let a = bindingPatternObjRoot.a;
let objPatternNoDefault = bindingPatternObjRoot.b;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = undefined;
let rest = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
let c = bindingPatternObjRoot.c;
$(a, c, rest);
`````

## Output

`````js filename=intro
const obj = {
  get a() {
    const tmpReturnArg = $('a');
    return tmpReturnArg;
  },
  get b() {
    const tmpReturnArg$1 = {
      get c() {
        const tmpReturnArg$2 = $('b');
        return tmpReturnArg$2;
      },
      get d() {
        const tmpReturnArg$3 = $('c');
        return tmpReturnArg$3;
      },
      get e() {
        const tmpReturnArg$4 = $('d');
        return tmpReturnArg$4;
      },
    };
    return tmpReturnArg$1;
  },
  get c() {
    const tmpReturnArg$5 = $('c');
    return tmpReturnArg$5;
  },
};
const a = obj.a;
const objPatternNoDefault = obj.b;
const tmpCalleeParam$1 = [];
const rest = objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
const c = obj.c;
$(a, c, rest);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 'd'
 - 5: 'c'
 - 6: 'a', 'c', { c: '"b"', d: '"c"', e: '"d"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
