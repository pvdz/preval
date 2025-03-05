# Preval test case

# closure_bug.md

> Ref tracking > Closure bug

This tripped an ASSERT at some point because of code predating ref tracking

## Input

`````js filename=intro
let x = $;
if ($) {

} else {
  x = {};
}
x = $(1);
$(x.headers);
const f = function() {
  $(x);
};
$(f);
`````

## Pre Normal


`````js filename=intro
let x = $;
if ($) {
} else {
  x = {};
}
x = $(1);
$(x.headers);
const f = function () {
  debugger;
  $(x);
};
$(f);
`````

## Normalized


`````js filename=intro
let x = $;
if ($) {
} else {
  x = {};
}
x = $(1);
const tmpCalleeParam = x.headers;
$(tmpCalleeParam);
const f = function () {
  debugger;
  $(x);
  return undefined;
};
$(f);
`````

## Output


`````js filename=intro
const tmpSSA_x /*:unknown*/ = $(1);
const tmpCalleeParam /*:unknown*/ = tmpSSA_x.headers;
$(tmpCalleeParam);
const f /*:()=>undefined*/ = function () {
  debugger;
  $(tmpSSA_x);
  return undefined;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = a.headers;
$( b );
const c = function() {
  debugger;
  $( a );
  return undefined;
};
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
