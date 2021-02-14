# Preval test case

# auto_seq_simple_computed_simple.md

> normalize > expressions > assignments > stmt_func_block > auto_seq_simple_computed_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    (a = { b: $(1) })($(1), a)["b"] = $(2);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    const tmpObjLitVal = $(1);
    a = { b: tmpObjLitVal };
    let tmpCallCallee = a;
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = a;
    const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    const tmpAssignComputedObj = tmpAssignMemLhsObj;
    const tmpAssignComputedProp = 'b';
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
    const tmpObjLitVal = $(1);
    a = { b: tmpObjLitVal };
    let tmpCallCallee = a;
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = a;
    const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    const tmpAssignComputedRhs = $(2);
    tmpAssignMemLhsObj['b'] = tmpAssignComputedRhs;
    $(a);
  }
}
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
