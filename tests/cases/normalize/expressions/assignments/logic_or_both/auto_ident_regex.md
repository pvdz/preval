# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = /foo/) || (a = /foo/));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = /foo/) || (a = /foo/));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = /foo/;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = /foo/;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = /foo/;
if (a) {
  $(a);
} else {
  const tmpNestedComplexRhs /*:regex*/ = /foo/;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = /foo/;
if (a) {
  $( a );
}
else {
  const b = /foo/;
  a = b;
  $( b );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
