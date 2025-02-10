# Preval test case

# a-bc-d-getset.md

> Expr order > A-bc-d-getset
>
> Double check whether this can't be broken

## Input

`````js filename=intro
let a = 1;
let b = {
    get c()  { $('b.get'); b = undefined; d = undefined; return 5; },
    set c(x) { $('b.set'); b = null; d = null; return 7; },
};
let d = 3;
// This should _NOT_ crash. Despite all attempts to set b to null.
a = b.c = d;
// b should end up being null, d should end up being null, a should be 3.
$(a, b, d);
`````

## Pre Normal


`````js filename=intro
let a = 1;
let b = {
  get c() {
    debugger;
    $(`b.get`);
    b = undefined;
    d = undefined;
    return 5;
  },
  set c($$0) {
    let x = $$0;
    debugger;
    $(`b.set`);
    b = null;
    d = null;
    return 7;
  },
};
let d = 3;
a = b.c = d;
$(a, b, d);
`````

## Normalized


`````js filename=intro
let a = 1;
let b = {
  get c() {
    debugger;
    $(`b.get`);
    b = undefined;
    d = undefined;
    return 5;
  },
  set c($$0) {
    let x = $$0;
    debugger;
    $(`b.set`);
    b = null;
    d = null;
    return 7;
  },
};
let d = 3;
const tmpNestedPropAssignRhs = d;
b.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, d);
`````

## Output


`````js filename=intro
let b = {
  get c() {
    debugger;
    $(`b.get`);
    b = undefined;
    d = undefined;
    return 5;
  },
  set c($$0) {
    debugger;
    $(`b.set`);
    b = null;
    d = null;
    return 7;
  },
};
let d /*:primitive*/ = 3;
b.c = 3;
$(3, b, d);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  get c() {
    debugger;
    $( "b.get" );
    a = undefined;
    b = undefined;
    return 5;
  },
  set c( $$0 ) {
    debugger;
    $( "b.set" );
    a = null;
    b = null;
    return 7;
  },
};
let b = 3;
a.c = 3;
$( 3, a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'b.set'
 - 2: 3, null, null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
