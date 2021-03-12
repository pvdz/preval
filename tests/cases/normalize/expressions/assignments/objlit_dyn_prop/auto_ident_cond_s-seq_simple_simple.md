# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident cond s-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = (10, 20, 30) ? $(2) : $($(100)))]: 10 });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = (10, 20, 30) ? $(2) : $($(100)))]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(2);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const SSA_a = $(2);
const tmpCalleeParam = { [SSA_a]: 10 };
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { 2: '10' }
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
