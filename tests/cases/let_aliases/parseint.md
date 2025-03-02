# Preval test case

# parseint.md

> Let aliases > Parseint
>
> When two const bindings are assigned the same value, they are an alias

## Input

`````js filename=intro
const n = $('1');
let the_let_binding = $(1);

function f() {
  the_let_binding = 2;
  f = function() {
    return the_let_binding
  };
  return f();
}

// a and b are clearly an alias
const a = the_let_binding;
const m = parseInt(n);
const mm = m / 33;
const the_let_alias_to_eliminate = a;
$(a, the_let_alias_to_eliminate);
$(f);
$(mm);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  the_let_binding = 2;
  f = function () {
    debugger;
    return the_let_binding;
  };
  return f();
};
const n = $(`1`);
let the_let_binding = $(1);
const a = the_let_binding;
const m = parseInt(n);
const mm = m / 33;
const the_let_alias_to_eliminate = a;
$(a, the_let_alias_to_eliminate);
$(f);
$(mm);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  the_let_binding = 2;
  f = function () {
    debugger;
    return the_let_binding;
  };
  const tmpReturnArg = f();
  return tmpReturnArg;
};
const n = $(`1`);
let the_let_binding = $(1);
const a = the_let_binding;
const m = parseInt(n);
const mm = m / 33;
const the_let_alias_to_eliminate = a;
$(a, the_let_alias_to_eliminate);
$(f);
$(mm);
`````

## Output


`````js filename=intro
let f /*:()=>unknown*/ = function () {
  debugger;
  the_let_binding = 2;
  f = function () {
    debugger;
    return the_let_binding;
  };
  const tmpReturnArg /*:unknown*/ = f();
  return tmpReturnArg;
};
const n /*:unknown*/ = $(`1`);
let the_let_binding /*:unknown*/ = $(1);
const a /*:unknown*/ = the_let_binding;
const m /*:number*/ = parseInt(n);
$(a, a);
$(f);
const mm /*:number*/ = m / 33;
$(mm);
`````

## PST Output

With rename=true

`````js filename=intro
let a = function() {
  debugger;
  b = 2;
  a = function() {
    debugger;
    return b;
  };
  const c = a();
  return c;
};
const d = $( "1" );
let b = $( 1 );
const e = b;
const f = parseInt( d );
$( e, e );
$( a );
const g = f / 33;
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1'
 - 2: 1
 - 3: 1, 1
 - 4: '<function>'
 - 5: 0.030303030303030304
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
