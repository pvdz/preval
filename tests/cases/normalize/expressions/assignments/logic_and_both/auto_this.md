# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Logic and both > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = this) && (a = this));
$(a);

//*/// (end of file artifact)
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = this;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = this;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let SSA_a = this;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = this;
  SSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
