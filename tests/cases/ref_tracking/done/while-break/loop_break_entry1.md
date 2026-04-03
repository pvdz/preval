# Preval test case

# loop_break_entry1.md

> Ref tracking > Done > While-break > Loop break entry1
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);       // x=1
  while (true) {
    if ($) {
      $(x);   // x=1
      x = 2;  // Does not overwrite itself because it does not loop
      break;
    }
  }
  $(x);       // x=2
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ while (true) {
  /*12~25*/ /* stmt(13): */ if ($) {
    /*15~24*/ /* stmt(16): */ $(/*___19__*/ x);
    /* stmt(20): */ /*___23__*/ x = 2;
    /* stmt(24): */ break;
  } /*25~25*/ else {
  }
}
/* stmt(26): */ $(/*___29__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,19        | none           | 23
  - r @9       | 4
  - r @19      | 4
  - w @23      | ########## | 29          | 4              | none
  - r @29      | 23
