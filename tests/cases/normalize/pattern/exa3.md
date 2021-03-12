# Preval test case

# exa3.md

> Normalize > Pattern > Exa3
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
  }};
let { a, b: { c, ...rest } } = obj;
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
};
let $tdz$__pattern_after_default = obj;
let a = $tdz$__pattern_after_default.a;
let objPatternNoDefault = $tdz$__pattern_after_default.b;
let c = objPatternNoDefault.c;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = ['c'];
const tmpCalleeParam$2 = undefined;
let rest = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
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
};
const a = obj.a;
const objPatternNoDefault = obj.b;
const c = objPatternNoDefault.c;
const tmpCalleeParam$1 = ['c'];
const rest = objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
$(a, c, rest);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'b'
 - 4: 'c'
 - 5: 'd'
 - 6: 'a', 'b', { d: '"c"', e: '"d"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
