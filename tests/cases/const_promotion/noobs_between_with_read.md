# Preval test case

# noobs_between_with_read.md

> Const promotion > Noobs between with read
>
> A let decl with assignment later can be transformed if there are only statements in between with no observable side effects.

## Input

`````js filename=intro
let x = $(10);
var a = function(){ return x; }; // Closure, making trivial analysis harder
a = x;
x = $(20);
$(x, a, 'final');
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let x = $(10);
a = function () {
  debugger;
  return x;
};
a = x;
x = $(20);
$(x, a, `final`);
`````

## Normalized


`````js filename=intro
let a = undefined;
let x = $(10);
a = function () {
  debugger;
  return x;
};
a = x;
x = $(20);
$(x, a, `final`);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(10);
const tmpClusterSSA_x /*:unknown*/ = $(20);
$(tmpClusterSSA_x, x, `final`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( 20 );
$( b, a, "final" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 20, 10, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
