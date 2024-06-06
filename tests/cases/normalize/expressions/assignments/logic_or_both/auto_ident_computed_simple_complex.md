# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = b[$("c")]) || (a = b[$("c")]));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$((a = b[$(`c`)]) || (a = b[$(`c`)]));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $(`c`);
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCompObj = b;
  const tmpCompProp = $(`c`);
  const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const tmpAssignRhsCompProp = $(`c`);
const b = { c: 1 };
let a = b[tmpAssignRhsCompProp];
const tmpCalleeParam = a;
if (a) {
  $(tmpCalleeParam);
} else {
  const tmpCompProp = $(`c`);
  const tmpNestedComplexRhs = b[tmpCompProp];
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
let c = b[ a ];
const d = c;
if (c) {
  $( d );
}
else {
  const e = $( "c" );
  const f = b[ e ];
  c = f;
  $( f );
}
$( c, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 1
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
