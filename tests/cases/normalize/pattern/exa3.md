# Preval test case

# exa3.md

> Normalize > Pattern > Exa3
>
> from gist

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


## Settled


`````js filename=intro
const obj /*:object*/ = {
  get a() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(`a`);
    return tmpReturnArg;
  },
  get b() {
    debugger;
    const tmpReturnArg$1 /*:object*/ = {
      get c() {
        debugger;
        const tmpReturnArg$3 /*:unknown*/ = $(`b`);
        return tmpReturnArg$3;
      },
      get d() {
        debugger;
        const tmpReturnArg$5 /*:unknown*/ = $(`c`);
        return tmpReturnArg$5;
      },
      get e() {
        debugger;
        const tmpReturnArg$7 /*:unknown*/ = $(`d`);
        return tmpReturnArg$7;
      },
    };
    return tmpReturnArg$1;
  },
};
const a /*:unknown*/ = obj.a;
const tmpOPND /*:unknown*/ = obj.b;
const c /*:unknown*/ = tmpOPND.c;
const tmpCalleeParam$1 /*:array*/ = [`c`];
const rest /*:unknown*/ = $objPatternRest(tmpOPND, tmpCalleeParam$1, undefined);
$(a, c, rest);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = {
  get a() {
    const tmpReturnArg = $(`a`);
    return tmpReturnArg;
  },
  get b() {
    const tmpReturnArg$1 = {
      get c() {
        const tmpReturnArg$3 = $(`b`);
        return tmpReturnArg$3;
      },
      get d() {
        const tmpReturnArg$5 = $(`c`);
        return tmpReturnArg$5;
      },
      get e() {
        const tmpReturnArg$7 = $(`d`);
        return tmpReturnArg$7;
      },
    };
    return tmpReturnArg$1;
  },
};
const a = obj.a;
const tmpOPND = obj.b;
$(a, tmpOPND.c, $objPatternRest(tmpOPND, [`c`], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  get a() {
    debugger;
    const b = $( "a" );
    return b;
  },
  get b() {
    debugger;
    const c = {
      get c() {
        debugger;
        const d = $( "b" );
        return d;
      },
      get d() {
        debugger;
        const e = $( "c" );
        return e;
      },
      get e() {
        debugger;
        const f = $( "d" );
        return f;
      },
    };
    return c;
  },
};
const g = a.a;
const h = a.b;
const i = h.c;
const j = [ "c" ];
const k = $objPatternRest( h, j, undefined );
$( g, i, k );
`````


## Normalized
(This is what phase1 received the first time)

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
let tmpBindingPatternObjRoot = obj;
let a = tmpBindingPatternObjRoot.a;
let tmpOPND = tmpBindingPatternObjRoot.b;
let c = tmpOPND.c;
let tmpCalleeParam = tmpOPND;
let tmpCalleeParam$1 = [`c`];
let rest = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(a, c, rest);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 'd'
 - 5: 'a', 'b', { d: '"c"', e: '"d"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
