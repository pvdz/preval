# Preval test case

# auto_prop_simple_simple.md

> normalize > expressions > assignments > ternary_a > auto_prop_simple_simple
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

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
let tmpIfTest;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
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
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
let tmpIfTest;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
a.b = 2;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 100
 - 4: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
