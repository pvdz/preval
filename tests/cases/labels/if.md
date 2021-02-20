# Preval test case

# if.md

> Labels > If
>
> Make sure the labeled `if` doesn't screw up transforms

#TODO

## Input

`````js filename=intro
let x = $(100);
$(0);
foo: if (x) {
  $(1);
  break foo;
}
$(2);
`````

## Normalized

`````js filename=intro
let x = $(100);
$(0);
foo: {
  if (x) {
    $(1);
    break foo;
  }
}
$(2);
`````

## Output

`````js filename=intro
const x = $(100);
$(0);
foo: {
  if (x) {
    $(1);
    break foo;
  }
}
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 1
 - 4: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
