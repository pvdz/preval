# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete arg[$("y")]) && (a = delete arg[$("y")]));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a = delete arg[$(`y`)]) && (a = delete arg[$(`y`)]));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpDeleteCompObj$1 = arg;
  const tmpDeleteCompProp$1 = $(`y`);
  const tmpNestedComplexRhs = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
let a = delete arg[tmpDeleteCompProp];
const tmpCalleeParam = a;
if (a) {
  const tmpDeleteCompProp$1 = $(`y`);
  const tmpNestedComplexRhs = delete arg[tmpDeleteCompProp$1];
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "y" );
const b = { y: 1 };
let c = deleteb[ a ];
const d = c;
if (c) {
  const e = $( "y" );
  const f = deleteb[ e ];
  c = f;
  $( f );
}
else {
  $( d );
}
$( c, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 'y'
 - 3: true
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
