# Preval test case

# auto_seq_complex_computed_complex.md

> normalize > expressions > assignments > stmt_func_block > auto_seq_complex_computed_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    (a = { b: $(1) })($(1), $(a))[$("b")] = $(2);
    $(a);

    //*/// (end of file artifact)
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    let tmpCallCallee;
    const tmpObjLitVal = $(1);
    const tmpNestedComplexRhs = { b: tmpObjLitVal };
    a = tmpNestedComplexRhs;
    tmpCallCallee = tmpNestedComplexRhs;
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(a);
    const tmpAssignComMemLhsObj = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    const tmpAssignComMemLhsProp = $('b');
    const tmpAssignComputedObj = tmpAssignComMemLhsObj;
    const tmpAssignComputedProp = tmpAssignComMemLhsProp;
    const tmpAssignComputedRhs = $(2);
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    $(a);
  }
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$1(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    let tmpCallCallee;
    const tmpObjLitVal = $(1);
    const tmpNestedComplexRhs = { b: tmpObjLitVal };
    a = tmpNestedComplexRhs;
    tmpCallCallee = tmpNestedComplexRhs;
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(a);
    const tmpAssignComMemLhsObj = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    const tmpAssignComMemLhsProp = $('b');
    const tmpAssignComputedObj = tmpAssignComMemLhsObj;
    const tmpAssignComputedProp = tmpAssignComMemLhsProp;
    const tmpAssignComputedRhs = $(2);
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    $(a);
  }
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$1(tmpCalleeParam$2);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { b: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
