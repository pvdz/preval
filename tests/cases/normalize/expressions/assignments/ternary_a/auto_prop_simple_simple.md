# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > Ternary a > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) ? $(100) : $(200));
a.b = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) ? $(100) : $(200));
a.b = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
a.b = 2;
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpCalleeParam = $(100);
$(tmpCalleeParam);
const a = { b: 2 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 100 );
$( a );
const b = { b: 2 };
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 100
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
