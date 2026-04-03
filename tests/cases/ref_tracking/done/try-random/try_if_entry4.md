# Preval test case

# try_if_entry4.md

> Ref tracking > Done > Try-random > Try if entry4
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x); // x=1
  while (true) {
    try {
      $(x);
    } catch {
      if ($) {
        $(x);
        x = 2; // Does overwrite itself
      }
    }
  }
  $(x); // unreachable
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ while (true) {
  /*12~33*/ /* stmt(13): */ try /*14~18*/ {
    /* stmt(15): */ $(/*___18__*/ x);
  } catch (/*___20__*/ e) /*21~33*/ {
    /* stmt(22): */ if ($) {
      /*24~32*/ /* stmt(25): */ $(/*___28__*/ x);
      /* stmt(29): */ /*___32__*/ x = 2;
    } /*33~33*/ else {
    }
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,28     | none           | 32
  - r @9       | 4
  - r @18      | 4,32
  - r @28      | 4,32
  - w @32      | ########## | 18,28       | 4,32           | 32

e:
  - w @20      | ########## | not read    | none           | none
