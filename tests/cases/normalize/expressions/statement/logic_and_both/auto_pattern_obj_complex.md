# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$({ a: 1, b: 2 }) && $({ a: 1, b: 2 });
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$({ a: 1, b: 2 }) && $({ a: 1, b: 2 });
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = { a: 1, b: 2 };
  tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { a: 1, b: 2 };
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 = { a: 1, b: 2 };
  $(tmpCalleeParam$1);
} else {
}
$(999);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 1,
b: 2
;
const b = $( a );
if (b) {
  const c = {
a: 1,
b: 2
  ;
  $( c );
}
$( 999 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
