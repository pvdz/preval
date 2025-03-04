# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Logic and both > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = arguments) && (a = arguments));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = arguments) && (a = arguments));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = arguments;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  a = arguments;
  tmpCalleeParam = arguments;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = arguments;
const tmpCalleeParam /*:unknown*/ = a;
if (a) {
  a = arguments;
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = arguments;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = arguments;
const b = a;
if (a) {
  a = arguments;
  const c = arguments;
  $( c );
}
else {
  $( b );
}
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: '<Global Arguments>'
 - 2: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
