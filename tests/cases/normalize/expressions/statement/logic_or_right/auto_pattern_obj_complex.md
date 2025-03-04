# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Logic or right > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(100) || $({ a: 1, b: 2 });
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$(100) || $({ a: 1, b: 2 });
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  tmpCallCallee(tmpCalleeParam);
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
if (tmpIfTest) {
} else {
  const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
  $(tmpCalleeParam);
}
$(999);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {

}
else {
  const b = {
    a: 1,
    b: 2,
  };
  $( b );
}
$( 999 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
