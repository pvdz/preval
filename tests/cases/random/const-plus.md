# Preval test case

# const-plus.md

> random > const-plus
>
> Const inlining with addition inlining will require a loop of sorts

## Input

`````js filename=intro
const x = 'a';
const y = 'b' + x;
const z = x + y;
const xyz = z;
$(xyz);
`````

## Normalized

`````js filename=intro
const x = 'a';
const y = 'b' + x;
const z = x + y;
const xyz = z;
$(xyz);
`````

## Uniformed

`````js filename=intro
var x = 'str';
var x = 'str' * x;
var x = x * x;
var x = x;
x(x);
`````

## Output

`````js filename=intro
$('aba');
`````
