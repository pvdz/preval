# Preval test case

# auto_ident_new_ident_complex_args.md

> normalize > expressions > assignments > for_in_left > auto_ident_new_ident_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for ((a = new $($(1), $(2))).x in $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpNewCallee = $;
  const tmpCalleeParam$1 = $(1);
  const tmpCalleeParam$2 = $(2);
  a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$2);
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCalleeParam$1 = $(1);
  const tmpCalleeParam$2 = $(2);
  a = new $(tmpCalleeParam$1, tmpCalleeParam$2);
  const tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: { x: '"x"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
