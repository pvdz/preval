# Preval test case

# global_group_ident.md

> normalize > member_access > global_group_ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
const a = {x: 1}
const y = (1, a)??x
$(y);
`````

## Normalized

`````js filename=intro
var tmpNullish;
var tmpTernaryTest;
const a = { x: 1 };
1;
tmpNullish = a;
tmpTernaryTest = tmpNullish == null;
{
  let y;
  if (tmpTernaryTest) {
    y = x;
  } else {
    y = tmpNullish;
  }
}
$(y);
`````

## Output

`````js filename=intro
var tmpNullish;
var tmpTernaryTest;
const a = { x: 1 };
tmpNullish = a;
tmpTernaryTest = tmpNullish == null;
let y;
if (tmpTernaryTest) {
  y = x;
} else {
  y = tmpNullish;
}
$(y);
`````

## Result

Should call `$` with:
[[{ x: 1 }], null];

Normalized calls: BAD?!
[[20], null];

Final output calls: Same
