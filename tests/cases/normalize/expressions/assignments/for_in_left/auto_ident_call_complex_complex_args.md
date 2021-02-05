# Preval test case

# auto_ident_call_complex_complex_args.md

> normalize > expressions > assignments > for_in_left > auto_ident_call_complex_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for ((a = $($)($(1), $(2))).x in $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    let tmpAssignMemLhsObj;
    const tmpCallCallee$1 = $($);
    const tmpCalleeParam$1 = $(1);
    const tmpCalleeParam$2 = $(2);
    const tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
({ $: $ });
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  let tmpAssignMemLhsObj;
  const tmpCallCallee$1 = $($);
  const tmpCalleeParam$1 = $(1);
  const tmpCalleeParam$2 = $(2);
  const tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
  a = tmpNestedComplexRhs;
  tmpAssignMemLhsObj = tmpNestedComplexRhs;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
