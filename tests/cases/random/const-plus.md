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
$(xyz)
`````

## Output

`````js filename=intro
const x = "aba";
const y = "ba";
const z = "aba";
const xyz = "aba";
$("aba");
`````
