# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
$(parseInt??length);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
parseInt = parseInt;
tmpTernaryTest = parseInt == null;
if (tmpTernaryTest) {
  tmpArg = length;
} else {
  tmpArg = parseInt;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
parseInt = parseInt;
tmpTernaryTest = parseInt == null;
if (tmpTernaryTest) {
  tmpArg = length;
} else {
  tmpArg = parseInt;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
