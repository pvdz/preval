# Preval test case

# if_if_single_override.md

> Ref tracking > Done > If-pure > If if single override
>
> How does an if influence the entry and exit writes

## Options

- refTest

## Input

`````js filename=intro
//// The case where both branches overwrite x
//{
//  let x = 1;
//  if ($) {
//    if ($) {
//      x = 2;
//    } else {
//      x = 3;
//    }
//    $(x); // 2 or 3 but not 1
//  }
//  $(x); // 1 2 or 3
//}


// Now the case where the if/else is not overwriting x in both branches
{
  let x = 1;
  if ($) {
    if ($) {
      x = 2;
    } else {
    }
    $(x); // 1 or 2
  }
  $(x); // 1 or 2
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
if ($) {
  /*8*/ x___12__ = 2;
  $(x___16__);
  $(x___20__);
} /*21*/ else {
  $(x___25__);
}
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 25          | none           | 12
  - w @12      | ########## | 16,20       | 4              | none
  - r @16      | 12
  - r @20      | 12
  - r @25      | 4
