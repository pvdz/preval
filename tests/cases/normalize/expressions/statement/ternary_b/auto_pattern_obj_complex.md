# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Ternary b > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(1) ? $({ a: 1, b: 2 }) : $(200);
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$(1) ? $({ a: 1, b: 2 }) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam = { a: 1, b: 2 };
  $(tmpCalleeParam);
} else {
  $(200);
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
  $(tmpCalleeParam);
} else {
  $(200);
}
$(999);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = {
    a: 1,
    b: 2,
  };
  $( b );
}
else {
  $( 200 );
}
$( 999 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '1', b: '2' }
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
