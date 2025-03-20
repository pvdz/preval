# Preval test case

# loop_redundant3.md

> Ref tracking > Done > While-if > Loop redundant3
>
> String should be replaced with an empty string (or a custom string indicating they can't be observed)

## Options

- refTest

## Input

`````js filename=intro
{
  let a = "unobservable";
  while ($LOOP_UNROLL_500) {
    a = $;
    if ($) {
      $(a)
    }
  }
}
`````


## Output

(Annotated with pids)

`````filename=intro
let a___4__ = `unobservable`;
while ($LOOP_UNROLL_500___8__) {
  /*9*/ a___13__ = $;
  if ($) {
    /*16*/ $(a___20__);
  } /*21*/ else {
  }
}
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | not read    | none           | 13
  - w @13      | ########## | 20          | 4,13           | 13
  - r @20      | 13
