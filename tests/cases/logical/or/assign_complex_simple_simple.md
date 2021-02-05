# Preval test case

# simple_simple.md

> logical > and > simple_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = 1 || 2);
`````

## Normalized

`````js filename=intro
var x;
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs = 1;
if (tmpNestedComplexRhs) {
} else {
  tmpNestedComplexRhs = 2;
}
x = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var x;
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs = 1;
if (tmpNestedComplexRhs) {
} else {
  tmpNestedComplexRhs = 2;
}
x = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
