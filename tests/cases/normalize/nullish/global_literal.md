# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
$('foo'??length);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
tmpNullish = 'foo';
tmpTernaryTest = tmpNullish == null;
if (tmpTernaryTest) {
  tmpArg = length;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = 'str';
x = x * x;
if (x) {
  x = x;
} else {
  x = x;
}
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
tmpNullish = 'foo';
tmpTernaryTest = tmpNullish == null;
if (tmpTernaryTest) {
  tmpArg = length;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````
