# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
const y = (1, 2, $())?.foo
$(y);
`````

## Normalized

`````js filename=intro
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
1;
2;
tmpOptionalChaining = $();
tmpTernaryTest = tmpOptionalChaining == null;
{
  let y;
  if (tmpTernaryTest) {
    y = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining.foo;
    y = tmpTernaryAlternate;
  }
}
$(y);
`````

## Output

`````js filename=intro
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpOptionalChaining = $();
tmpTernaryTest = tmpOptionalChaining == null;
let y;
if (tmpTernaryTest) {
  y = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining.foo;
  y = tmpTernaryAlternate;
}
$(y);
`````

## Result

Should call `$` with:
[[], [null], null];

Normalized calls: BAD?!
[[], [20], null];

Final output calls: Same
