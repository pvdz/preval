# Preval test case

# auto_ident_call_prop_c-seq.md

> normalize > expressions > statement > for_in_left > auto_ident_call_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for ((1, 2, $(b)).$(1).x in $({ x: 1 }));
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
    1;
    2;
    const tmpCallObj = $(b);
    const tmpAssignMemLhsObj = tmpCallObj.$(1);
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCallObj = $(b);
  const tmpAssignMemLhsObj = tmpCallObj.$(1);
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
