# Preval test case

# continue_loop.md

> labels > continue_loop
>
> Labels that are direct parents of loops should not become blocks because that might break labeled continue statements

#TODO

## Input

`````js filename=intro
let fail = false;
foo: while(true) {
  $(1);
  fail = true;
  continue foo;
}
$(2);
`````

## Normalized

`````js filename=intro
let fail = false;
foo: while (true) {
  $(1);
  fail = true;
  continue foo;
}
$(2);
`````

## Output

`````js filename=intro
foo: while (true) {
  $(1);
  fail = true;
  continue foo;
}
$(2);
`````

## Result

Should call `$` with:
[
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  [1],
  '<crash[ Loop aborted by Preval test runner ]>',
];

Normalized calls: Same

Final output calls: Same
