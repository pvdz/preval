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

## Pre Normal

`````js filename=intro
let obj = {
  get a() {
    debugger;
    return $(`a`);
  },
  get b() {
    debugger;
    return {
      get c() {
        debugger;
        return $(`b`);
      },
      get d() {
        debugger;
        return $(`c`);
      },
      get e() {
        debugger;
        return $(`d`);
      },
    };
  },
};
let {
  a: a,
  b: { c: c, ...rest },
} = obj;
$(a, c, rest);
`````

## Normalized

`````js filename=intro
let obj = {
  get a() {
    debugger;
    const tmpReturnArg = $(`a`);
    return tmpReturnArg;
  },
  get b() {
    debugger;
    const tmpReturnArg$1 = {
      get c() {
        debugger;
        const tmpReturnArg$3 = $(`b`);
        return tmpReturnArg$3;
      },
      get d() {
        debugger;
        const tmpReturnArg$5 = $(`c`);
        return tmpReturnArg$5;
      },
      get e() {
        debugger;
        const tmpReturnArg$7 = $(`d`);
        return tmpReturnArg$7;
      },
    };
    return tmpReturnArg$1;
  },
};
let bindingPatternObjRoot = obj;
let a = bindingPatternObjRoot.a;
let objPatternNoDefault = bindingPatternObjRoot.b;
let c = objPatternNoDefault.c;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [`c`];
const tmpCalleeParam$3 = undefined;
let rest = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(a, c, rest);
`````

## Output

`````js filename=intro
const obj = {
  get a() {
    debugger;
    const tmpReturnArg = $(`a`);
    return tmpReturnArg;
  },
  get b() {
    debugger;
    const tmpReturnArg$1 = {
      get c() {
        debugger;
        const tmpReturnArg$3 = $(`b`);
        return tmpReturnArg$3;
      },
      get d() {
        debugger;
        const tmpReturnArg$5 = $(`c`);
        return tmpReturnArg$5;
      },
      get e() {
        debugger;
        const tmpReturnArg$7 = $(`d`);
        return tmpReturnArg$7;
      },
    };
    return tmpReturnArg$1;
  },
};
const a = obj.a;
const objPatternNoDefault = obj.b;
const c = objPatternNoDefault.c;
const tmpCalleeParam$1 = [`c`];
const rest = objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
$(a, c, rest);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
get a() {
    debugger;
    const b = $( "a" );
    return b;
  },,
get b() {
    debugger;
    const c = {
get c() {
        debugger;
        const d = $( "b" );
        return d;
      },,
get d() {
        debugger;
        const e = $( "c" );
        return e;
      },,
get e() {
        debugger;
        const f = $( "d" );
        return f;
      },
    ;
    return c;
  },
;
const g = a.a;
const h = a.b;
const i = h.c;
const j = [ "c" ];
const k = objPatternRest( h, j, undefined );
$( g, i, k );
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
