# Preval test case

# redundant_init2.md

> Binding > Promote const > Redundant init2
>
> Trying to figure out why the let x = undefined case is not being eliminated

#TODO

## Input

`````js filename=intro
while (true) {
  let a = undefined;
  a = $(1);
  $(a);
  break;
}
`````

## Pre Normal

`````js filename=intro
while (true) {
  let a = undefined;
  a = $(1);
  $(a);
  break;
}
`````

## Normalized

`````js filename=intro
while (true) {
  let a = undefined;
  a = $(1);
  $(a);
  break;
}
`````

## Output

`````js filename=intro
while (true) {
  const SSA_a = $(1);
  $(SSA_a);
  break;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
