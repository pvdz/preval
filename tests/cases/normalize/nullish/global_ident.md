# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
$(parseInt??foo);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
parseInt = parseInt;
tmpTernaryTest = parseInt == null;
if (tmpTernaryTest) {
  tmpArg = foo;
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
  tmpArg = foo;
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
