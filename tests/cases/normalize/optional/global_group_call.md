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
var tmpTernaryAlternate;
var tmpTernaryTest;
1;
2;
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

## Output

`````js filename=intro
var tmpOptionalChaining;
var tmpTernaryAlternate;
var tmpTernaryTest;
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
 - 0: 
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
