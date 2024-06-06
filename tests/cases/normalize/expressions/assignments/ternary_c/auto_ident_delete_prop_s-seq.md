# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident delete prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = delete ($(1), $(2), arg).y));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = delete ($(1), $(2), arg).y));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  $(1);
  $(2);
  const tmpDeleteObj = arg;
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
const arg = { y: 1 };
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  $(1);
  $(2);
  const tmpNestedComplexRhs = delete arg.y;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = $( 0 );
const c = { y: 1 };
if (b) {
  const d = $( 100 );
  $( d );
}
else {
  $( 1 );
  $( 2 );
  const e = deletec.y;
  a = e;
  $( e );
}
$( a, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: true
 - 5: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
