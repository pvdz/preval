# Preval test case

# inc_simplify.md

> Incdec > Inc simplify
>
> This case is from a regular loop with ++b condition.
> But the way we transform `a=++x` is `tmp=x; x=x+1; a=tmp`
> Post-update rules should be able to see that the temp assignment is
> not observable and collapse them.
> Alternatively, and we should probably do that too, we can optimize
> the transform by changing it to assign first update second.

## Input

`````js filename=intro
let a = 0;
let b = 0;
let c = {valueOf: () => { $('c flag now:', flag); }};
let d = {valueOf: () => { $('d flag now:', flag); }};
let flag = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (flag < 10) {
    
    flag = a++;
    $('a++', flag);
    
    flag = ++b;
    $('++b', flag);
    
    flag = ++c;
    $('++c', flag);

    flag = d++;
    $('d++', flag);
    
  } else {
    break;
  }
}
$(a, b, c, flag);
`````

## Settled


`````js filename=intro
let a /*:number*/ = 0;
let b /*:number*/ = 0;
const tmpObjLitVal /*:()=>undefined*/ = function () {
  debugger;
  $(`c flag now:`, flag);
  return undefined;
};
let c /*:unknown*/ = { valueOf: tmpObjLitVal };
const tmpObjLitVal$1 /*:()=>undefined*/ = function () {
  debugger;
  $(`d flag now:`, flag);
  return undefined;
};
let d /*:unknown*/ = { valueOf: tmpObjLitVal$1 };
let flag /*:unknown*/ = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest /*:boolean*/ = flag < 10;
  if (tmpIfTest) {
    const tmpPostUpdArgIdent /*:unknown*/ = a;
    a = a + 1;
    flag = tmpPostUpdArgIdent;
    $(`a++`, tmpPostUpdArgIdent);
    b = b + 1;
    flag = b;
    $(`++b`, b);
    const tmpPostUpdArgIdent$3 /*:number*/ = $coerce(c, `number`);
    c = tmpPostUpdArgIdent$3 + 1;
    flag = c;
    $(`++c`, c);
    const tmpPostUpdArgIdent$5 /*:number*/ = $coerce(d, `number`);
    d = tmpPostUpdArgIdent$5 + 1;
    flag = tmpPostUpdArgIdent$5;
    $(`d++`, tmpPostUpdArgIdent$5);
  } else {
    break;
  }
}
$(a, b, c, flag);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 0;
let b = 0;
const tmpObjLitVal = function () {
  $(`c flag now:`, flag);
};
let c = { valueOf: tmpObjLitVal };
const tmpObjLitVal$1 = function () {
  $(`d flag now:`, flag);
};
let d = { valueOf: tmpObjLitVal$1 };
let flag = 0;
while (true) {
  if (flag < 10) {
    const tmpPostUpdArgIdent = a;
    a = a + 1;
    flag = tmpPostUpdArgIdent;
    $(`a++`, tmpPostUpdArgIdent);
    b = b + 1;
    flag = b;
    $(`++b`, b);
    c = $coerce(c, `number`) + 1;
    flag = c;
    $(`++c`, c);
    const tmpPostUpdArgIdent$5 = $coerce(d, `number`);
    d = tmpPostUpdArgIdent$5 + 1;
    flag = tmpPostUpdArgIdent$5;
    $(`d++`, tmpPostUpdArgIdent$5);
  } else {
    break;
  }
}
$(a, b, c, flag);
`````

## Pre Normal


`````js filename=intro
let a = 0;
let b = 0;
let c = {
  valueOf: () => {
    debugger;
    $(`c flag now:`, flag);
  },
};
let d = {
  valueOf: () => {
    debugger;
    $(`d flag now:`, flag);
  },
};
let flag = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (flag < 10) {
    flag = a++;
    $(`a++`, flag);
    flag = ++b;
    $(`++b`, flag);
    flag = ++c;
    $(`++c`, flag);
    flag = d++;
    $(`d++`, flag);
  } else {
    break;
  }
}
$(a, b, c, flag);
`````

## Normalized


`````js filename=intro
let a = 0;
let b = 0;
const tmpObjLitVal = function () {
  debugger;
  $(`c flag now:`, flag);
  return undefined;
};
let c = { valueOf: tmpObjLitVal };
const tmpObjLitVal$1 = function () {
  debugger;
  $(`d flag now:`, flag);
  return undefined;
};
let d = { valueOf: tmpObjLitVal$1 };
let flag = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest = flag < 10;
  if (tmpIfTest) {
    const tmpPostUpdArgIdent = $coerce(a, `number`);
    a = tmpPostUpdArgIdent + 1;
    flag = tmpPostUpdArgIdent;
    $(`a++`, tmpPostUpdArgIdent);
    const tmpPostUpdArgIdent$1 = $coerce(b, `number`);
    b = tmpPostUpdArgIdent$1 + 1;
    flag = b;
    $(`++b`, b);
    const tmpPostUpdArgIdent$3 = $coerce(c, `number`);
    c = tmpPostUpdArgIdent$3 + 1;
    flag = c;
    $(`++c`, c);
    const tmpPostUpdArgIdent$5 = $coerce(d, `number`);
    d = tmpPostUpdArgIdent$5 + 1;
    flag = tmpPostUpdArgIdent$5;
    $(`d++`, tmpPostUpdArgIdent$5);
  } else {
    break;
  }
}
$(a, b, c, flag);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 0;
let b = 0;
const c = function() {
  debugger;
  $( "c flag now:", d );
  return undefined;
};
let e = { valueOf: c };
const f = function() {
  debugger;
  $( "d flag now:", d );
  return undefined;
};
let g = { valueOf: f };
let d = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const h = d < 10;
  if (h) {
    const i = a;
    a = a + 1;
    d = i;
    $( "a++", i );
    b = b + 1;
    d = b;
    $( "++b", b );
    const j = $coerce( e, "number" );
    e = j + 1;
    d = e;
    $( "++c", e );
    const k = $coerce( g, "number" );
    g = k + 1;
    d = k;
    $( "d++", k );
  }
  else {
    break;
  }
}
$( a, b, e, d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a++', 0
 - 2: '++b', 1
 - 3: 'c flag now:', 1
 - 4: '++c', NaN
 - 5: 'd flag now:', NaN
 - 6: 'd++', NaN
 - 7: 1, 1, NaN, NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
