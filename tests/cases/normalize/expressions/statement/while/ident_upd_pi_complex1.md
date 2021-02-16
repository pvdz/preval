# Preval test case

# auto_ident_upd_pi_complex.md

> normalize > expressions > statement > while > auto_ident_upd_pi_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {x: 5};
let t = true;
while (t) {
  let p = --b.x;
  t = p;
  $(100);
}
$(b);
`````

## Normalized

`````js filename=intro
let b = { x: 5 };
let t = true;
while (t) {
  const tmpBinLhs = b.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
  b.x = varInitAssignLhsComputedRhs;
  let p = varInitAssignLhsComputedRhs;
  t = p;
  $(100);
}
$(b);
`````

## Output

`````js filename=intro
const b = { x: 5 };
let t = true;
while (t) {
  const tmpBinLhs = b.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
  b.x = varInitAssignLhsComputedRhs;
  t = varInitAssignLhsComputedRhs;
  $(100);
}
$(b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: { x: '0' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
