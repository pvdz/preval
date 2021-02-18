# Preval test case

# continue_SKIP.md

> normalize > switch > continue_SKIP
>
> If a switch with non-last-default case gets transformed to a loop then continue statements inside a switch no longer work as they did before...

Make sure SSA doesn't apply here, or at least makes sure that the assignment in the loop is still reflected in the while condition.

## Input

`````js filename=intro
  let run = true;
  while (run) {
    $(1);
    run = false;
  }
`````

## Normalized

`````js filename=intro
let run = true;
while (true) {
  if (run) {
    $(1);
    run = false;
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let run = true;
while (true) {
  if (run) {
    $(1);
    run = false;
  } else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
