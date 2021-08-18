/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity;

import lombok.Data;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Entity
@Data
public class RecipeEntity {
    @Id
    @GeneratedValue
    private int id;

    private String title;

    @Column(length = 1024)
    private String description;

    private String imageFileName;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private UserEntity author;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "id")
    private List<IngredientEntity> ingredients;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "id")
    private List<DirectionEntity> directions;
}
