# Preval test case

# exa4.md

> Normalize > Pattern > Exa4
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
  },
  get c(){ return $('c') },
};
let { a, b: { ...rest }, c } = obj;
$(a, c, rest);
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = {
  get a() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(`a`);
    return tmpReturnArg;
  },
  get b() {
    debugger;
    const tmpReturnArg$1 /*:object*/ /*truthy*/ = {
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
  get c() {
    debugger;
    const tmpReturnArg$9 /*:unknown*/ = $(`c`);
    return tmpReturnArg$9;
  },
};
const a /*:unknown*/ = obj.a;
const tmpOPND /*:unknown*/ = obj.b;
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [];
const rest /*:unknown*/ = $objPatternRest(tmpOPND, tmpCalleeParam$1, undefined);
const c /*:unknown*/ = obj.c;
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
  get c() {
    const tmpReturnArg$9 = $(`c`);
    return tmpReturnArg$9;
  },
};
const a = obj.a;
const rest = $objPatternRest(obj.b, [], undefined);
$(a, obj.c, rest);
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
  get c() {
    debugger;
    const g = $( "c" );
    return g;
  },
};
const h = a.a;
const i = a.b;
const j = [];
const k = $objPatternRest( i, j, undefined );
const l = a.c;
$( h, l, k );
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
  get c() {
    debugger;
    const tmpReturnArg$9 = $(`c`);
    return tmpReturnArg$9;
  },
};
let tmpBindingPatternObjRoot = obj;
let a = tmpBindingPatternObjRoot.a;
let tmpOPND = tmpBindingPatternObjRoot.b;
let tmpCalleeParam = tmpOPND;
let tmpCalleeParam$1 = [];
let rest = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
let c = tmpBindingPatternObjRoot.c;
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
 - 5: 'c'
 - 6: 'a', 'c', { c: '"b"', d: '"c"', e: '"d"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
